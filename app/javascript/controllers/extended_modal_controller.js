import { Modal } from "tailwindcss-stimulus-components"

export default class ExtendedModal extends Modal {
  static targets = ["form", "errors"];

  connect() {
    super.connect();
  }

  open(e) {
    super.open(e);
    // Always want to clear errors on open
    this.clearErrors();
    // Reset all values on open
    // FIXME: need to find a clever way to do this
    if (this.hasFormTarget) {
      let contactFormNameElement = document.getElementById("contact_name");
      let contactFormEmailElement = document.getElementById("contact_email");
      let contactFormPhoneElement = document.getElementById("contact_phone");
      let contactFormMessageElement = document.getElementById("contact_messages_attributes_0_body");
      if (contactFormNameElement) {
        contactFormNameElement.value = "";
      }
      if (contactFormEmailElement) {
        contactFormEmailElement.value = "";
      }
      if (contactFormPhoneElement) {
        contactFormPhoneElement.value = "";
      }
      if (contactFormMessageElement) {
        contactFormMessageElement.value = "";
      }
    }
  }

  handleSuccess({ detail: { success } }) {
    if (success) {
      super.close();
      this.clearErrors();
      this.formTarget.reset();
    }
  }

  clearErrors() {
    if (this.hasErrorsTarget) {
      this.errorsTarget.remove();
    }
  }
}
