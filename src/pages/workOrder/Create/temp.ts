export type RemoteFormTemplate = {
  templateConfigVO: {};
  formInfoVO: {};
  fieldDesignVOList: {};
  buttonList: [];
};
export type FormItemData = {
  type: string;
  key: string;
  label: string;
  rules?: Record<string, any>[];
  trigger?: string;
  props?: Record<string, any>;
  disabled?: boolean;
  request?: {
    url: string;
    method: string;
    params: any;
  };
};
const formData: {
  formItemData: FormItemData[];
} = {
  formItemData: [
    {
      type: "Title",
      key: "baseInfo",
      label: "诉求人信息",
      disabled: true,
    },
    {
      type: "Input",
      key: "complainantName",
      label: "姓名",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
      },
    },
    {
      type: "Input",
      key: "complainantNamePhone",
      label: "联系电话",
      disabled: true,
      rules: [
        {
          required: true,
        },
        {
          pattern: "^\\d{11}$",
          mode: "",
        },
      ],
      props: {
        placeholder: "请输入",
      },
    },
    {
      type: "DicSelect",
      key: "complainantSex",
      label: "投诉人性别",
      disabled: true,
      trigger: "onConfirm",
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
        dicName: "sex",
      },
    },
    {
      type: "title",
      key: "baseInfo",
      label: "工单信息",
      disabled: true,
    },
    {
      type: "DicSelect",
      key: "complainType",
      label: "诉求类型",
      trigger: "onConfirm",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
        dicName: "sex",
      },
    },
    {
      type: "DicCascader",
      key: "complainCntType",
      label: "内容类别",
      disabled: true,
      trigger: "onConfirm",
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
        dicName: "sex",
      },
    },
    {
      type: "DatePicker",
      key: "complainOccurTime",
      label: "诉求发生时间",
      disabled: true,
      trigger: "onConfirm",
      props: {
        placeholder: "请选择",
        precision: "minute",
        format: "YYYY-MM-DD HH:mm",
      },
    },
    {
      type: "Stepper",
      key: "round",
      label: "交办轮次",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        min: 1,
        max: 10,
      },
    },
    {
      type: "DatePicker",
      key: "deadline",
      label: "拟办期限",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请选择",
      },
    },
    {
      type: "Cascader",
      key: "area",
      label: "所属区域",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请选择",
        request: {
          url: "/mock/api/xxx/cascader",
          method: "get",
          params: {
            d: 1,
          },
        },
      },
    },
    {
      type: "DicSelect",
      key: "sourceChannel",
      label: "来源渠道",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请选择",
        dicName: "sex",
      },
    },
    {
      type: "subTitle",
      key: "",
      label: "",
      disabled: true,
    },
    {
      type: "Input",
      key: "complainAddr",
      label: "诉求地点",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
      },
    },
    {
      type: "Input",
      key: "complainTitle",
      label: "诉求标题",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
      },
    },
    {
      type: "TextArea",
      key: "complainDesc",
      label: "诉求描述",
      disabled: true,
      rules: [
        {
          required: true,
        },
      ],
      props: {
        placeholder: "请输入",
        rows: 4,
      },
    },
    {
      type: "ImageUploader",
      key: "complainFiles",
      label: "诉求附件",
      disabled: true,
      props: {
        accept: "image/jpeg,image/jpg,image/png",
        maxCount: 5,
      },
    },
  ],
};
export default formData;
