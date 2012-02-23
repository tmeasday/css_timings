class TimingsController < ApplicationController
  layout 'experiment'
  
  def runner
    render :layout => nil
  end
end
