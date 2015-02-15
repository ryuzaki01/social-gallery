class MainController < ApplicationController
  before_filter :authenticate_user!, :only => [:show, :tag, :logout]
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
    client = Instagram.client(:access_token => session[:access_token])
	@user = client.user
    searchid = client.user_search(params[:id])[0]
	@other_user = client.user(searchid.id)
  end
  
  def tag
	client = Instagram.client(:access_token => session[:access_token])
	@user = client.user
	@tag = client.tag(params[:id])
  end
  
  def media
	client = Instagram.client(:access_token => session[:access_token])
	@user = client.user
	@media = client.media_item(params[:id])
  end
end
