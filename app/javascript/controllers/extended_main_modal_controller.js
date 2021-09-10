import { Modal } from "tailwindcss-stimulus-components"

export default class ExtendedMainModal extends Modal {
  static targets = ["mainform", "mainerrors"];

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
    if (this.hasMainerrorsTarget) {
      this.mainerrorsTarget.remove();
    }
  }

  resetValues() {
    if (this.hasMainformTarget) {
      // The rest should be enough
      this.mainformTarget.reset();
      // Therefore after errors the reset seems to not work properly, so force values to be blanked
      const container = document.querySelector("#contact_main_form");
      if (container) {
        const matches = container.querySelectorAll("input.input");
        matches.forEach(function(userInput) {
          userInput.value = "";
        });
      }
    }
  }
}
