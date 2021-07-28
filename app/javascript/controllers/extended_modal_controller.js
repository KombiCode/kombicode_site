import { Modal } from "tailwindcss-stimulus-components"

export default class ExtendedModal extends Modal {
  static targets = ["form", "errors"]

  connect() {
    super.connect()
  }

  handleSuccess({ detail: { success } }) {
    if (success) {
      super.close()
      this.clearErrors()
      this.formTarget.reset()
    }
  }

  next(event) {
    // Hide error display area in case modal was dismissed
    if (document.getElementById('error_explanation')) {
      document.getElementById('error_explanation').style.display = 'none';
    }
  }

  clearErrors() {
    console.log("Clear errors");
    if (this.hasErrorsTarget) {
      this.errorsTarget.remove()
    }
    // Hide error display area in case modal was dismissed
    if (document.getElementById('error_explanation')) {
      console.log("Clear errors explanantions");
      document.getElementById('error_explanation').style.display = 'none';
    }
  }
}
