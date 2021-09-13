import { Modal } from "tailwindcss-stimulus-components"

export default class ExtendedModal extends Modal {
  static targets = ["form", "errors"];
  static values = { from: Number }

  connect() {
    console.log(`EMC connect ${this}`);
    super.connect();
  }

  open(e) {
    console.log(`EMC open ${this.fromValue}`);
    super.open(e);
    // Always want to clear errors on open
    this.clearErrors();
    // Reset all values on open
    this.resetValues();
  }

  handleSuccess({ detail: { success } }) {
    console.log(`EMC handleSuccess ${this}`);
    if (success) {
      super.close();
    }
  }

  clearErrors() {
    console.log(`EMC clearErrors ${this}`);
    if (this.hasErrorsTarget) {
      this.errorsTarget.remove();
    }
  }

  resetValues() {
    console.log(`EMC resetValues ${this}`);
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
