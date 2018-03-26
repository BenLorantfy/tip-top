/**
 * @name rollup.config.js
 * @description This is the configuration for rollup, a source code bundler. Rollup 
 * will take all our source code and bundle it into one file for us, for easy distribution.
 * We also run our code through babel first, so we can use fancy new ES2015+ feautres in our
 * source code, and it will get compiled into browser-compatible ES2015 in our dist code.
 * Based off this article: https://developers.livechatinc.com/blog/how-to-create-javascript-libraries-in-2018-part-1/
 * 
 * One thing cool about rollup is we can make two dist files. One for normal consumption using CommonJS.
 * But we can also create a dist file that uses ES5 modules. ES5 modules are static, and are easier for
 * consumption by other build tools such as webpack.
 */
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

// This creates our list of external dependencies. However,
// instead of just creating strings (e.g. "react"), it creates a function that
// return a boolean for wether a import string matches. This let's 
// us match against sub-directory imports. 
// e.g.
// ```
//  import something from react/something
// ```
const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`)
  return id => externalPattern.test(id)
}

export default {
  input: 'src/index.js',
  // We don't want our dependencies included in the bundle, otherwise
  // our library consumers will have duplicate versions of our dependencies.
  // All we need to do is include our dependencies in the package.json, and then
  // yarn or npm will include them for us. This is esspecially important for react,
  // because react only works if one instance of it is loaded. npm3 and yarn will
  // flatten the dependency structure, so this will work fine
  // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
  external: makeExternalPredicate(externals),
  plugins: [
    babel()
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ]
}