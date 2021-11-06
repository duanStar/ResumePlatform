export interface TStore {
  /**
   * @description 选中工具条模块的keys
   */
  resumeToolbarKeys: string[];
  /**
   * @description 可用模板列表
   */
  templateList: TSTemplate.Item[];
  /**
   * @description 当前使用模板
   */
  selectTemplate: TSTemplate.Item;
}

const templateModel: TSRcReduxModel.Props<TStore> = {
  namespace: 'templateModel',
  openSeamlessImmutable: true,
  state: {
    resumeToolbarKeys: [], // 选中工具条模块的keys
    templateList: [],
    selectTemplate: { templateId: '', templateName: '', templateCover: '' },
  },
};

export default templateModel;
