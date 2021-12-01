class ContactMailer < ApplicationMailer
  def contact_message_email
    blacklist = ENV["PROHIBITED_EMAILS"]
    @contact = params[:contact]
    mail(to: 'thierry.jet@kombicode.com', subject: 'New contact message') unless blacklist.include? @contact.email
  end
end
