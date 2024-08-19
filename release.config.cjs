/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
	branches: [
		'prod',
		{ name: 'stage', prerelease: true },
		{ name: 'dev', prerelease: true },
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/github',
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message:
					'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
}
