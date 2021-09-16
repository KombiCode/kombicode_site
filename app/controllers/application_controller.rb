class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  around_action :switch_locale

  def switch_locale(&action)
    begin
      locale = extract_locale_from_accept_language_header
      if !I18n.available_locales.include? locale.to_sym
        locale = I18n.default_locale
      end
      I18n.with_locale(locale, &action)
    rescue Exception => e
      render "errors/not_found"
    end
  end
  
  def default_url_options
    { 
      locale: I18n.locale,
      host: ENV["DOMAIN"] || "localhost:5000" || "localhost:3000"
    }
  end

  def render_flash
    render turbo_stream: turbo_stream.update("flash_notice", partial: "shared/flash_notice")
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  private
  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end

end
