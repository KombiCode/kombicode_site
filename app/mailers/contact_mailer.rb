class ContactMailer < ApplicationMailer
  def contact_message_email
    @contact = params[:contact]
    mail(to: 'phenix.tj38@gmail.com', subject: 'New contact message')
  end
end
