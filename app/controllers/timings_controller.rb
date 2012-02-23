class TimingsController < ApplicationController
  layout 'experiment'
  
  def start
    @experiments = experiments
    render :layout => nil
  end
  
  def runner
    @experiments = experiments
    render :layout => nil
  end

private
  def experiments
    {
      :empty => 'No styles all',
      :base => 'One different style per each 10k divs',
      :class_inapplicable => 'Base, plus 10k styles that apply to non-existent classes',
      :general_inapplicable => 'Base, plus 10k styles which rightmost target divs',
      :specific_inapplicable => 'Base, plus 10k styles which rightmost target spans',
      :one_rule_many_selectors => 'One big rule that targest each of the 10k divs seperately',
      :one_rule_many_selectors_and_rules => 'The same rule repeated for each of the 10k divs',
      :big_styles => 'Base, plus 1k styles that have about 10 rules each'
    }
  end

end
