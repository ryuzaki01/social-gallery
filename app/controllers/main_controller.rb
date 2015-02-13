class MainController < ApplicationController
  before_filter :authenticate_user!, :only => [:show, :tag, :logout]
  def start
	
  end
  
  def show
    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    @photos = client.user_recent_media
  end
  
  def tag
	render action: 'show'
  end
end
