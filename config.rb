###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
#page "/", :layout => false
#
# With alternative layout
# page "/blog/*", :layout => :blog_layout
page "/articles/*", :layout => :blog_layout

#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'
activate :directory_indexes

set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :fenced_code_blocks => true, with_toc_data: true, :smartypants => true
set :markdown_engine, :redcarpet

#Google Analytics
activate :google_analytics do |ga|
  ga.tracking_id = 'UA-63369789-1' # Replace with your property ID.
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
  #
  activate :favicon_maker, :icons => {
    "_favicon_template.png" => [
      { icon: "apple-touch-icon-152x152-precomposed.png" },
      { icon: "apple-touch-icon-114x114-precomposed.png" },
      { icon: "apple-touch-icon-72x72-precomposed.png" },
      { icon: "favicon-196x196.png" },
      { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
      { icon: "favicon.png", size: "16x16" },
    ]
  }
end

activate :deploy do |deploy|
  deploy.method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  deploy.branch   = 'master' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "articles"

  # Matcher for blog source files
  blog.permalink = "{title}.html"
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.layout = "layouts/blog_layout"

  blog.taglink = "{tag}.html"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # blog list summary
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250

  # pagination
  blog.paginate = true
  blog.page_link = "p{num}"

  # year format
  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".markdown"

  Time.zone = "Auckland"
  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end
