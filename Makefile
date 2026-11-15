.PHONY: coverage test check lint typecheck unit

# Quality infrastructure (shared fragment). This is a TypeScript project, so it
# includes quality-ts.mk only; checks.mk is the Python developer-check fragment
# (ruff/mypy/pytest) and does not apply. lint, typecheck and check are defined
# below with the TypeScript recipes.
SRC_DIR   := src
TESTS_DIR := tests
SERVE_DEFINED := 1
QUALITY_MK := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/quality-ts.mk
include $(QUALITY_MK)

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
