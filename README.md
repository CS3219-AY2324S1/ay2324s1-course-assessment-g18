## Immediate Steps After Merge

1. `git pull` on `master`

2. Delete all `node_modules` folders

3. Run `npm install` on all project folders again

4. On any outdated branch before this PR, checkout to said branch and run `git merge master` to receive latest updates, and additionally resolve merge conflicts if any

## Important Notes

1. Probably would cause conflicts with any commit from this point forward, please merge ASAP

3. Make sure your terminal active directory is pointing to the project folder e.g. `/ay2324s1-course-assessment-g18/web-admin-dashboard` before running any `npm` commands

5. You may open the `vscode.code-workspace` file in VSCode, this will force you to select which project folder you want to open your terminal in (in case you forget to set active directory in Step 2)
