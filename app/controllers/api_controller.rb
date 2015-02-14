class ApiController < ApplicationController
  def index
  end
  
  def user_media
	client = Instagram.client(:access_token => session[:access_token])

	if params[:id]
		@photos = client.user_recent_media(:count => 12, :max_id => params[:id])
	else
		@photos = client.user_recent_media(:count => 12)
	end
	
	next_max_id = @photos.pagination ? @photos.pagination.next_max_id : nil;
	
	respond_to do |f|
		f.html #index.html.erb
		f.json { render json: { "medias" => @photos.as_json(:root => false), "max_id" =>  next_max_id }.to_json }
	end
  end
  
  def user_feed
	client = Instagram.client(:access_token => session[:access_token])
	
	if params[:id]
		@photos = client.user_media_feed(:count => 12, :max_id => params[:id])
	else
		@photos = client.user_media_feed(:count => 12)
	end
	
	next_max_id = @photos.pagination ? @photos.pagination.next_max_id : nil;
	
	respond_to do |f|
		f.html #index.html.erb
		f.json { render json: { "medias" => @photos.as_json(:root => false), "max_id" =>  next_max_id }.to_json }
	end
  end
  
  def popular
	client = Instagram.client()

	if params[:id]
		@photos = client.media_popular(:count => 12, :max_id => params[:id])
	else
		@photos = client.media_popular(:count => 12)
	end
	
	next_max_id = @photos.pagination ? @photos.pagination.next_max_id : nil;
	
	respond_to do |f|
		f.html #index.html.erb
		f.json { render json: { "medias" => @photos.as_json(:root => false), "max_id" =>  next_max_id }.to_json }
	end
  end
  
  def like
	client = Instagram.client(:access_token => session[:access_token])
	@result = client.like_media("#{params[:id]}")
	respond_to do |f|
		f.html #index.html.erb
		f.json { render json: @result, root: false }
	end
  end
  
  def unlike
	client = Instagram.client(:access_token => session[:access_token])
	@result = client.unlike_media("#{params[:id]}")
	respond_to do |f|
		f.html #index.html.erb
		f.json { render json: @result, root: false }
	end
  end
end
