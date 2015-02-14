require "instagram"


Instagram.configure do |config|

	config.client_id = "b98e0f4b1c2e4b05893fee9bf3786c98"
	config.client_secret = "65585067aae44de8ba2977290d5daf7a"

end
CALLBACK_URL = "http://192.168.0.12:3000/sessions/callback"