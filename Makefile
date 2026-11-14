.PHONY: coverage test check lint typecheck unit

# Quality infrastructure (shared fragments).
# checks.mk is Python-oriented (ruff/mypy/pytest) and defines lint, typecheck,
# coverage and check; this is a TypeScript project, so those targets are
# redefined below, AFTER the includes, so the TypeScript recipes win.
SRC_DIR   := src
TESTS_DIR := tests
QUALITY_MK := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/quality-ts.mk
CHECKS_MK  := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/checks.mk
include $(QUALITY_MK)
include $(CHECKS_MK)

# Plain `make` runs lint, type-check and unit tests (no e2e; see `make test`).
.DEFAULT_GOAL := check

lint:
	npx eslint src --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-pattern .gitignore

typecheck:
	yarn type-check

unit:
	npx vitest run --coverage --coverage.reportsDirectory=coverage

check: lint typecheck unit

# ACIS entry point: produces coverage/coverage-summary.json and exits 0 even
# if tests fail, so the pipeline can still score the repo.
coverage:
	npx vitest run --coverage --coverage.reportsDirectory=coverage || true

# Full suite including Cypress e2e.
test:
	yarn test:all

serve:
	quasar dev
