/**
 * 	@name .babelrc.js
 * 	@description This is the configuration for babel, a build tool that takes ES2015+ source code as input and
 * 	outputs browser-compatible ES2015 code for distribution.
 * 
 * 	Based off this article https://developers.livechatinc.com/blog/how-to-create-javascript-libraries-in-2018-part-1/
 * 	With a few modifications. For one, we need the react preset to transform JSX into React.createElement
 * 	In order to use fancy new ES6 features like object spread and arrow functions, the easiest option
 * 	is to use the stage-0 plugin
 */ 
module.exports = {
	presets: [
		["@babel/env", { modules: false }],
		"@babel/stage-0",
		"@babel/react"
	],
  "env": {
    "test": {
      "presets": [
				["@babel/env"], 
				"@babel/stage-0",
				"@babel/react"
			]
    }
  }
}
