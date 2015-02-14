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
  
  def tag
	render action: 'show'
  end
end
