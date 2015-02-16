require "instagram"
require "socket"
class ApplicationController < ActionController::Base
	OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :exception
  
	def authenticate_user!
		redirect_to start_path unless session[:access_token] != nil
	end
end
