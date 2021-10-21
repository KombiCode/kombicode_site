class ContactMailer < ApplicationMailer
  def contact_message_email
    blacklist = ["eric.jones.z.mail@gmail.com"]
    @contact = params[:contact]
    mail(to: 'thierry.jet@kombicode.com', subject: 'New contact message') unless blacklist.include? @contact.email
  end
end
