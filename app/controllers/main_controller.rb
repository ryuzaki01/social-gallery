class MainController < ApplicationController
  before_filter :authenticate_user!, :only => [:show, :tag, :logout, :profile, :tag]
  def start
	client = Instagram.client()
  end
  
  def show
    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
  end
 
  def profile
    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
  end
  
  def user
    if session[:access_token]
		client = Instagram.client(:access_token => session[:access_token])
		@user = client.user
	else
		client = Instagram.client()
	end
    searchid = client.user_search(params[:id])[0]
	@other_user = client.user(searchid.id)
  end
  
  def tag
	client = Instagram.client(:access_token => session[:access_token])
	@user = client.user
	@tag = client.tag(params[:id])
  end
  
  def media
	if session[:access_token]
		client = Instagram.client(:access_token => session[:access_token])
		@user = client.user
	else
		client = Instagram.client()
	end
	@media = client.media_item(params[:id])
  end
end
