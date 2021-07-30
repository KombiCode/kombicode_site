class ContactMailer < ApplicationMailer
  def contact_message_email
    @contact = params[:contact]
    mail(to: 'thierry.jet@kombicode.com', subject: 'New contact message')
  end
end
