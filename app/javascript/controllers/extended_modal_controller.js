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
    this.resetValues();
  }

  handleSuccess({ detail: { success } }) {
    if (success) {
      super.close();
    }
  }

  clearErrors() {
    if (this.hasErrorsTarget) {
      this.errorsTarget.remove();
    }
  }

  resetValues() {
    if (this.hasFormTarget) {
      // The rest should be enough
      this.formTarget.reset();
      // Therefore after errors the reset seems to not work properly, so force values to be blanked
      const container = document.querySelector("#contact_form");
      if (container) {
        const matches = container.querySelectorAll("input.input");
        matches.forEach(function(userInput) {
          userInput.value = "";
        });
      }
    }
  }
}
