module.exports = {
  reactStrictMode: true,
  target: "serverless",
  webpack: (cfg) => {
    cfg.module.rules.push(
        {
            test: /\.md$/,
            loader: 'frontmatter-markdown-loader',
            options: { mode: ['react-component'] }
        }
    )
    return cfg;
}
}
