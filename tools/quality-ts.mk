# dashboard/tools/quality-ts.mk — shared TypeScript quality targets
#
# Include from a project Makefile with:
#   QUALITY_MK := $(realpath ../../dashboard/tools/quality-ts.mk)
#   include $(QUALITY_MK)

QUALITY_TOOLS_DIR := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))

.PHONY: lint-eslint typecheck-tsc test-vitest audit-deps-npm coverage-ts quality dashboard

lint-eslint: ## Lint with ESLint → reports/eslint.json
	@mkdir -p reports
	npx eslint --format json --output-file reports/eslint.json src || true

typecheck-tsc: ## Type-check with tsc → reports/tsc.json
	@mkdir -p reports
	node $(QUALITY_TOOLS_DIR)/tsc_json.mjs || true

test-vitest: ## Run tests with vitest → reports/vitest.json
	@mkdir -p reports
	npx vitest run --reporter=json --outputFile=reports/vitest.json \
	    --coverage.enabled --coverage.reporter=json \
	    --coverage.reportsDirectory=reports/coverage 2>/dev/null || true

audit-deps-npm: ## Scan npm dependencies → reports/npm-audit.json
	@mkdir -p reports
	npm audit --json > reports/npm-audit.json 2>/dev/null || true

coverage-ts: test-vitest ## Alias for ACIS coverage pass

quality: ## Run all TypeScript checks → reports/quality.json
	@mkdir -p reports
	@_d=$$(pwd); _label="$$(basename $$(dirname $$_d))/$$(basename $$_d)"; \
	printf "%s [%s] [eslint]\n" "$$(date +%H:%M:%S)" "$$_label" && $(MAKE) lint-eslint; \
	printf "%s [%s] [tsc]\n" "$$(date +%H:%M:%S)" "$$_label" && $(MAKE) typecheck-tsc; \
	printf "%s [%s] [vitest]\n" "$$(date +%H:%M:%S)" "$$_label" && $(MAKE) test-vitest; \
	printf "%s [%s] [npm-audit]\n" "$$(date +%H:%M:%S)" "$$_label" && $(MAKE) audit-deps-npm; \
	printf "%s [%s] [quality.json]\n" "$$(date +%H:%M:%S)" "$$_label" && node $(QUALITY_TOOLS_DIR)/write_quality_json.mjs .

dashboard: ## View project quality dashboard via HTTP server (make serve)
	@echo "File-served dashboards removed. Run: make serve"

serve: ## Start operator server → http://localhost:7842 (live dashboard + review triage)
	uv run --project $(QUALITY_TOOLS_DIR)/.. python $(QUALITY_TOOLS_DIR)/server.py $(CURDIR) $(notdir $(CURDIR))

auto-fix: ## Classify findings + quality violations, stage validated fixes → reports/auto-fixes/
	python3 $(QUALITY_TOOLS_DIR)/auto_resolver.py .

commit-fix: ## Commit a single staged fix to its branch: make commit-fix ID=<fix-id>
	@test -n "$(ID)" || (echo "Usage: make commit-fix ID=<fix-id>"; exit 1)
	@DIFF=$$(find reports/auto-fixes -name "fix-$(ID).diff" 2>/dev/null | head -1); \
	MSG=$$(find reports/auto-fixes -name "fix-$(ID).msg" 2>/dev/null | head -1); \
	test -n "$$DIFF" || (echo "Fix $(ID) not found in reports/auto-fixes/"; exit 1); \
	TYPE=$$(dirname "$$DIFF" | xargs basename); \
	BRANCH=auto-fix/$$TYPE; \
	CURRENT=$$(git rev-parse --abbrev-ref HEAD); \
	git checkout -b "$$BRANCH" 2>/dev/null || git checkout "$$BRANCH"; \
	git apply "$$DIFF" && git add -A && git commit -F "$$MSG"; \
	git checkout "$$CURRENT"

commit-fixes: ## Commit all staged fixes for a branch: make commit-fixes BRANCH=<type>
	@test -n "$(BRANCH)" || (echo "Usage: make commit-fixes BRANCH=<type>  (lint|type-harden|observability|test-gen)"; exit 1)
	@DIR=reports/auto-fixes/$(BRANCH); \
	test -d "$$DIR" || (echo "No staged fixes for branch $(BRANCH)"; exit 1); \
	CURRENT=$$(git rev-parse --abbrev-ref HEAD); \
	git checkout -b "auto-fix/$(BRANCH)" 2>/dev/null || git checkout "auto-fix/$(BRANCH)"; \
	for JSON in "$$DIR"/fix-*.json; do \
	    ID=$$(python3 -c "import json,sys; print(json.load(open(sys.argv[1]))['id'])" "$$JSON" 2>/dev/null); \
	    STATUS=$$(python3 -c "import json,sys; print(json.load(open(sys.argv[1]))['status'])" "$$JSON" 2>/dev/null); \
	    test "$$STATUS" = "staged" || continue; \
	    DIFF="$$DIR/fix-$$ID.diff"; MSG="$$DIR/fix-$$ID.msg"; \
	    test -f "$$DIFF" || continue; \
	    git apply "$$DIFF" && git add -A && git commit -F "$$MSG" && \
	    python3 -c "import json,sys; d=json.load(open(sys.argv[1])); d['status']='committed'; json.dump(d,open(sys.argv[1],'w'),indent=2)" "$$JSON"; \
	done; \
	git checkout "$$CURRENT"
