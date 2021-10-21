class ContactMailer < ApplicationMailer
  @blacklist = ENV["SPAM_EMAILS"]
  def contact_message_email
    @contact = params[:contact]
    mail(to: 'thierry.jet@kombicode.com', subject: 'New contact message')
      unless @blacklist.include? @contact.email
  end
end
