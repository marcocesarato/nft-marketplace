# How to Release

If you follow the [Conventional Commits](https://conventionalcommits.org/) specification like suggested on "[How to Contribute](../CONTRIBUTING.md)" page, you can release and run the execution of the automated tools like the [CHANGELOG](../CHANGELOG.md) generator and the autobump of the [semver](https://semver.org/lang/it/).

How the the logic of autobump works:

-   **PATCH:** Commit of the type fix that patches a bug in your codebase.
-   **MINOR:** Commit of the type feat that introduces a new feature to the codebase.
-   **MAJOR:** A commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change. A BREAKING CHANGE can be part of commits of any type.

## First Release

To generate your changelog for your first release, simply do:

```sh
yarn release -- --first-release
# or
npm run release -- --first-release
```

This will tag a release **without bumping the version**.

## Release with autobump

```sh
yarn release
# or
npm run release
```

As long as your git commit messages are conventional and accurate, you no longer need to specify the [semver](https://semver.org/lang/it/) type and you get CHANGELOG generation for free!

## Release imperatively

To bypass the automated version bump use `--release-as` with the argument `major`, `minor` or `patch`.

Suppose the last version of your code is `1.0.0`, you've only landed `fix:` commits, but
you would like your next release to be a `minor`. Simply run the following:

```bash
yarn release -- --release-as minor
# or
yarn release -- --release-as 1.1.0
```

You will get version `1.1.0` rather than what would be the auto-generated version `1.0.1`.

> **NOTE:** you can combine `--release-as` and `--prerelease` to generate a release. This is useful when publishing experimental feature(s).

## Prevent hooks

If you use git hooks, like pre-commit, to test your code before committing, you can prevent hooks from being verified during the commit step by passing the `--no-verify` option:

```sh
yarn release -- --no-verify
```

**[< Go to README](../README.md)**
