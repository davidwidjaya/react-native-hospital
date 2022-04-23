import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import '../../../global.js'

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        "Accept": "application/json",
        "token": global.bearer_token,
      },
    })
  }

  /**
   * Gets a single user by ID
   */


  async login(data): Promise<Types.GetDefaultResult> {
    this.apisauce.setHeader('Accept', 'application/json');
    this.apisauce.setHeader('Content-Type', 'application/json');
    // this.apisauce.setHeader('token', global.bearer_token);

    let response: ApiResponse<any>;
    let path = `/login`;
    console.log('mask api.ts');
    console.log(data);


    if (data._parts.length == 0) {
      response = await this.apisauce.post(path)
    }
    else {
      response = await this.apisauce.post(path, data)
    }
    console.log('response..', response);

    console.log('response.data.....', response.data);
    if (response.data.status == "error") {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      if (response.data && response.data.status != "error") {
        const result = response.data;
      }
      if (response.data.status == 200) {
        const resultData: Types.AppDefault = response.data.data;
        return { kind: "ok", data: resultData }
      } else {
        const resultData: Types.AppDefault = response.data.message;
        return { kind: "wrong", message: resultData }
      }

    } catch {
      return { kind: "bad-data", msg: response.data.message }
    }
  }
  async dashboard(data): Promise<Types.GetDefaultResult> {
    console.log('bearertokenglobal', global.bearer_token);
    this.apisauce.setHeader('Accept', 'application/json');
    this.apisauce.setHeader('Content-Type', 'application/json');
    this.apisauce.setHeader('x-token', global.bearer_token);

    let response: ApiResponse<any>;
    let path = `/dashboard`;
    console.log('mask api.ts');
    console.log(data);


    if (data._parts.length == 0) {
      response = await this.apisauce.get(path)
    }
    else {
      response = await this.apisauce.get(path, data)
    }
    console.log('response..', response);

    console.log('response.data.....', response.data);
    if (response.data.status == "error") {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      if (response.data && response.data.status != "error") {
        const result = response.data;
      }
      if (response.data.status == 200) {
        const resultData: Types.AppDefault = response.data;
        return { kind: "ok", data: resultData }
      } else {
        const resultData: Types.AppDefault = response.data.message;
        return { kind: "wrong", message: resultData }
      }

    } catch {
      return { kind: "bad-data", msg: response.data.message }
    }
  }
  async listFaskes(data): Promise<Types.GetDefaultResult> {
    console.log('bearertokenglobal', global.bearer_token);
    this.apisauce.setHeader('Accept', 'application/json');
    this.apisauce.setHeader('Content-Type', 'application/json');
    this.apisauce.setHeader('x-token', global.bearer_token);

    let response: ApiResponse<any>;
    let path = `/login/list_rs?consumer_id=reactnativ&consumer_secret=1234qwer%232&nama_consumer=mobileapp#2&nama_consumer=mobileapp`;
    console.log('mask api.ts');
    console.log(data);


    if (data._parts.length == 0) {
      response = await this.apisauce.get(path)
    }
    else {
      response = await this.apisauce.get(path, data)
    }
    console.log('response..', response);

    console.log('response.data.....', response.data);
    if (response.data.status == "error") {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      if (response.data && response.data.status != "error") {
        const result = response.data;
      }
      if (response.data.status == 200) {
        const resultData: Types.AppDefault = response.data.data;
        return { kind: "ok", data: resultData }
      } else {
        const resultData: Types.AppDefault = response.data.message;
        return { kind: "wrong", message: resultData }
      }

    } catch {
      return { kind: "bad-data", msg: response.data.message }
    }
  }
  async getNavbar(data): Promise<Types.GetDefaultResult> {
    console.log('bearertokenglobal', global.bearer_token);
    this.apisauce.setHeader('Accept', 'application/json');
    this.apisauce.setHeader('Content-Type', 'application/json');
    this.apisauce.setHeader('x-token', global.bearer_token);

    let response: ApiResponse<any>;
    let path = `/navbar?poli_req=1&list_departements=[{\"id_dept\":\"1\",\"prefix_dept_group\":\"C\"}]&landing_page=v5_dashboard&role=P&id_dept&akses_navbar_level1=["3000"]`;
    console.log('mask api.ts');
    console.log(data);


    if (data._parts.length == 0) {
      response = await this.apisauce.get(path)
    }
    else {
      response = await this.apisauce.get(path, data)
    }
    console.log('response..', response);

    console.log('response.data.....', response.data);
    if (response.data.status == "error") {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      if (response.data && response.data.status != "error") {
        const result = response.data;
      }
      if (response.data.status == 200) {
        const resultData: Types.AppDefault = response.data.data;
        return { kind: "ok", data: resultData }
      } else {
        const resultData: Types.AppDefault = response.data.message;
        return { kind: "wrong", message: resultData }
      }

    } catch {
      return { kind: "bad-data", msg: response.data.message }
    }
  }

}
