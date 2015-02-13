class SessionsController < ApplicationController
  def connect
    redirect_to Instagram.authorize_url(:redirect_uri => CALLBACK_URL, :scope => "likes comments relationships")
  end
  
  def disconnect
	session[:access_token] = nil
	redirect_to controller: 'main', action: 'show'
  end

  def callback
    response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
    session[:access_token] = response.access_token
    redirect_to :controller => 'main', :action => 'show'
  end
  
end