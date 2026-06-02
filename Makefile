.PHONY: coverage

coverage: ## Produce coverage/coverage-summary.json for ACIS (exits 0 even if tests fail)
	npx vitest run --coverage --coverage.reportsDirectory=coverage || true

# Quality infrastructure (shared fragment)
SRC_DIR   := src
TESTS_DIR := tests
QUALITY_MK := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/quality-ts.mk
CHECKS_MK  := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/checks.mk
include $(QUALITY_MK)
include $(CHECKS_MK)
