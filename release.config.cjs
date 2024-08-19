/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
	branches: [
		{ name: 'main' }, // Production releases
		{ name: 'alpha', prerelease: 'alpha' }, // Default alpha branch
		{ name: 'beta', prerelease: 'beta' }, // Default beta branch
		{ name: 'alpha/*', prerelease: true }, // All alpha branches, e.g., alpha/feature-X
		{ name: 'beta/*', prerelease: true }, // All beta branches, e.g., beta/feature-Y
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/exec',
			{
				prepareCmd:
					"node -e \"let pkg=require('./package.json');pkg.version='${nextRelease.version}';require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));\"",
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message:
					'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],

		'@semantic-release/github',
	],
}
