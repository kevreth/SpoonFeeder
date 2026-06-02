# tools/checks.mk — developer-facing TypeScript check and fix targets
#
# Human-readable output; no JSON artifacts. Complements quality-ts.mk (machine-readable pipeline).
#
# Include from a project Makefile with:
#   CHECKS_MK := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))tools/checks.mk
#   include $(CHECKS_MK)
#
# Override before including:
#   SRC_DIR   ?= src

SRC_DIR   ?= src

.PHONY: lint typecheck check fix sync-checks

lint: ## Lint with ESLint (human-readable output)
	npx eslint $(SRC_DIR)

typecheck: ## Type-check with tsc --noEmit (human-readable output)
	npx tsc --noEmit

check: lint typecheck ## Run all checks

fix: ## Auto-fix ESLint issues
	npx eslint --fix $(SRC_DIR)

CHECKS_MK_TS_URL ?= https://raw.githubusercontent.com/kevreth/kev-labs/main/dashboard/tools/checks-ts.mk

sync-checks: ## Pull latest checks.mk from GitHub
	curl -fsSL $(CHECKS_MK_TS_URL) -o $(lastword $(MAKEFILE_LIST))
