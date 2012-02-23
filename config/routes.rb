CssTimings::Application.routes.draw do
  match ':controller(/:action(/:id(.:format)))'
  
  root :to => 'timings#runner'
end
