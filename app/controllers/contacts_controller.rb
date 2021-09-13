class ContactsController < ApplicationController
  before_action :set_contact, only: %i[ show edit update destroy ]

  # GET /contacts or /contacts.json
  def index
    @contacts = Contact.all
  end

  # GET /contacts/1 or /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @from = params[:from]
    @contact = Contact.new
    @contact.messages.build
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts or /contacts.json
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      flash.now[:notice] = "Contact was successfully created."
      render turbo_stream: turbo_stream.update("flash_notice", partial: "shared/flash_notice")
      ContactMailer.with(contact: @contact).contact_message_email.deliver_now
    else
      puts "Save failed : #{self} - #{@contact.itself}:#{@contact.input_from}"
      # need to 'rebuild' messages area
      @contact.messages.build
      # render depending of where it comes from
      if @contact.input_from == "navbar"
        render turbo_stream: turbo_stream.replace(
          'contact_form',
          partial: 'form',
          locals: {
            contact: @contact
          }
        ), status: :unprocessable_entity
      else
        render turbo_stream: turbo_stream.replace(
          'contact_main_form',
          partial: 'mainform',
          locals: {
            contact: @contact
          }
        ), status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /contacts/1 or /contacts/1.json
  def update
    respond_to do |format|
      if @contact.update(contact_params)
        format.html { redirect_to @contact, notice: "Contact was successfully updated." }
        format.json { render :show, status: :ok, location: @contact }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1 or /contacts/1.json
  def destroy
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to contacts_url, notice: "Contact was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def contact_params
      params.require(:contact).permit(:name, :email, :phone, :input_from, messages_attributes: [:body])
    end
end
