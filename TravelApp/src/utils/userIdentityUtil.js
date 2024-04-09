import { clearUserToken, getUserToken, setUserToken } from '@/utils/auth';
import { showToast } from '@/components/Toast';

export default class UserIdentityUtil {
    // private static eventEmitter = new EventEmitter();
    // private static identityTypeList = null;
    // private static currentSelectedIdentityOrgID = null;
    // public static refreshIdentityTypeList = async () => {
    //   UserIdentityUtil.identityTypeList = null;
    //   // noinspection ES6RedundantAwait
    //   let newIdentityTypeList = [];
    //   try {
    //     newIdentityTypeList = (await getIdentities()).data ?? [];
    //     UserIdentityUtil.sendChangedListener(newIdentityTypeList);
    //     return Promise.resolve(UserIdentityUtil.identityTypeList);
    //   } catch (e) {
    //     showToast(e?.message);
    //     UserIdentityUtil.sendChangedListener(newIdentityTypeList);
    //     return Promise.resolve(UserIdentityUtil.identityTypeList);
    //   }
    // };
  
    // public static sendChangedListener = (
    //   identityTypeList: Array<IdentityType> | null | undefined = UserIdentityUtil.identityTypeList,
    //   currentSelectedIdentityOrgID = UserIdentityUtil.getCurrentSelectedIdentityOrgID(),
    // ): boolean => {
    //   UserIdentityUtil.identityTypeList = identityTypeList;
    //   UserIdentityUtil.currentSelectedIdentityOrgID = currentSelectedIdentityOrgID;
    //   return UserIdentityUtil.eventEmitter.emit('onIdentityTypeChanged', identityTypeList, currentSelectedIdentityOrgID);
    // };
  
    // public static addIdentityTypeChangedListener = (listener: OnChangeListener): EventEmitter<EventType, any> => {
    //   return UserIdentityUtil.eventEmitter.addListener('onIdentityTypeChanged', listener);
    // };
  
    // public static removeIdentityTypeChangedListener = (listener: OnChangeListener): EventEmitter<EventType, any> => {
    //   return UserIdentityUtil.eventEmitter.removeListener('onIdentityTypeChanged', listener);
    // };
  
    // public static changeSelectedIdentityType = async (
    //   userIdentityType: IdentityType,
    //   config?: { showLoading?: (text?: string | null | undefined) => void; hideLoading?: () => void },
    // ): Promise<void> => {
    //   config?.showLoading?.();
    //   try {
    //     await UserIdentityUtil.saveUserInfoWithTokenOnLoginOrChangeIdentity(await changeIdentity(userIdentityType.orgId));
    //     config?.hideLoading?.();
    //     navigateResetToHome();
    //   } catch (e: any) {
    //     config?.hideLoading?.();
    //     showToast(e.message);
    //   }
    // };
  
    // public static getCurrentSelectedIdentityOrgID = () => {
    //   return UserIdentityUtil.currentSelectedIdentityOrgID;
    // };
  
    // public static getIdentityTypeList = async (
    //   refresh: boolean = false,
    // ): Promise<Array<IdentityType> | null | undefined> => {
    //   if (refresh) {
    //     UserIdentityUtil.identityTypeList = null;
    //   }
    //   if (
    //     UserIdentityUtil.identityTypeList === null ||
    //     typeof UserIdentityUtil.identityTypeList === 'undefined' ||
    //     !UserIdentityUtil.identityTypeList?.length
    //   ) {
    //     await UserIdentityUtil.refreshIdentityTypeList();
    //     return Promise.resolve(UserIdentityUtil.identityTypeList);
    //   } else {
    //     return Promise.resolve(UserIdentityUtil.identityTypeList);
    //   }
    // };
  
     static saveUserInfo = async (userInfo) => {
      await clearUserInfo();
      await setUserInfo(userInfo);
    //   UserIdentityUtil.currentSelectedIdentityOrgID = userInfo?.orgId;
    };
     static saveUserToken = async (accessToken, refreshToken) => {
      await clearUserToken();
      await setUserToken(accessToken, refreshToken);
    };
  
    // public static clearUserInfoWithToken = async () => {
    //   await clearUserInfo();
    //   await clearUserToken();
    // };
    // /**
    //  * 退出登录并重置路由到登录页面
    //  */
    // public static logout = () => {
    //   UserIdentityUtil.clearUserInfoWithToken().then();
    //   navigateResetTo('Login');
    // };
  
    // //region 首次登录和非首次登录, 统一收口, 设置 currentSelectedIdentityOrgID
    // /**
    //  * 检测之前是否已经登录过, 已经登录过则无需重新登录
    //  * 重要的是设置 currentSelectedIdentityOrgID
    //  */
    // public static checkIsLoginOnAppStart = async (): Promise<boolean> => {
    //   const userInfo = await getUserInfo();
    //   UserIdentityUtil.currentSelectedIdentityOrgID = userInfo?.orgId;
    //   const userToken = await getUserToken();
    //   return !!userInfo && !!userToken;
    // };
  
    /**
     * 登录时/切换身份时调用
     * 保存用户信息/登录信息 统一收口
     * 通过 saveUserInfo 设置 currentSelectedIdentityOrgID
     */
     static saveUserInfoWithTokenOnLoginOrChangeIdentity = async (userInfoWithToken) => {
    //   await UserIdentityUtil.saveUserInfo(userInfoWithToken?.user_info);
      await UserIdentityUtil.saveUserToken(userInfoWithToken?.access_token, userInfoWithToken?.refresh_token);
    };
    //endregion
  }