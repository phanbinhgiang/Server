import axios from 'axios'
import get from 'lodash/get'

let onfidoClient

export default class OnfidoServices {
  static start () {
    onfidoClient = axios.create({
      baseURL: 'https://api.eu.onfido.com/v3.2/',
      headers: {
        Authorization: `Token token=${process.env.ONFIDO_TOKEN}`
      }
    })
  }

  static async genApplicant (firstName, lastName, email) {
    try {
      const response = await onfidoClient.post('applicants', { email, first_name: firstName, last_name: lastName })
      return get(response, 'data')
    } catch (error) {
      console.log('Onfido genApplicant error', get(error.response, 'data'))
      return false
    }
  }

  static async genToken (applicantId, isIOS) {
    try {
      const response = await onfidoClient.post('sdk_token', { applicant_id: applicantId, application_id: isIOS ? 'coin98.crypto.finance.insights' : 'coin98.crypto.finance.media' })
      return get(response.data, 'token')
    } catch (error) {
      console.log('Onfido genToken error', get(error.response, 'data'))
      return false
    }
  }

  static async genChecksNotFace (applicantId) {
    return onfidoClient.post('checks', { applicant_id: applicantId, report_names: ['document'] }).then(response => {
      return { success: true, data: get(response, 'data') }
    }).catch(error => {
      const message = get(error.response, 'data.error.fields.applicant')
      const messOnly = get(error.response, 'data.error.message')

      console.log(applicantId, message)
      console.log(applicantId, messOnly)

      return { success: false, data: message[0] || messOnly }
    })
  }

  static async genChecks (applicantId) {
    return onfidoClient.post('checks', { applicant_id: applicantId, report_names: ['document', 'facial_similarity_photo'] }).then(response => {
      return { success: true, data: get(response, 'data') }
    }).catch(error => {
      const message = get(error.response, 'data.error.fields.applicant')
      const messOnly = get(error.response, 'data.error.message')

      console.log(applicantId, message)
      console.log(applicantId, messOnly)

      return { success: false, data: message[0] || messOnly }
    })
  }

  static async getChecks (checkIds) {
    try {
      if (!checkIds) return false
      const response = await onfidoClient.get('checks/' + checkIds)
      return get(response, 'data')
    } catch (error) {
      console.log('Onfido getChecks error', get(error.response, 'data'))
      return false
    }
  }

  static async getReport (reportIds) {
    try {
      if (!reportIds) return false
      const response = await onfidoClient.get('reports/' + reportIds)
      console.log(get(response, 'data'))
      console.log(get(response, 'data.breakdown'))
      return get(response, 'data')
    } catch (error) {
      console.log('Onfido getReport error', get(error.response, 'data'))
      return false
    }
  }
}
