# social-gallery
Simple social media photo gallery, using ruby on rails

### Installation
Get Instagram Client id and Secret from : http://instagram.com/developer/clients/manage/

Set your instagram client id & secrets at config/initializers/instagram.rb :

```sh
require "instagram"


Instagram.configure do |config|

	config.client_id = "your client id"
	config.client_secret = "your client secret"

end
CALLBACK_URL = "http://192.168.0.12:3000/sessions/callback"
```

[Ihsan Fauzi]:http://www.opcodengine.com/

[requirejs-rails] https://rubygems.org/gems/requirejs-rails

[instagram-rubygem] https://github.com/Instagram/instagram-ruby-gem

[unsemantic] http://www.unsemantic.com

[JQuery]:http://jquery.com
