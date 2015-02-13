class ApiController < ApplicationController
  def index
  end
  
  def like
	client = Instagram.client(:access_token => session[:access_token])
	client.like_media("#{params[:id]}")
	redirect_to :controller => 'main', :action => 'show'
  end
  
  def unlike
	client = Instagram.client(:access_token => session[:access_token])
	client.unlike_media("#{params[:id]}")
	redirect_to :controller => 'main', :action => 'show'
  end
end
