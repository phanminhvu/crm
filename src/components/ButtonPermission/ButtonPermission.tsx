import { Button } from "antd";

interface ButtonPermissionPorps {
  visible: boolean;
  type: string;
  name: string;
  onSubmitLoading: boolean;
  onCancel: () => void;
}

const ButtonPermission: React.FC<ButtonPermissionPorps> = (props) => {
  const { visible, type, name, onSubmitLoading, onCancel } = props;

  return (
    <div>
      <Button type='primary'>{name}</Button>
    </div>
  );
};

export default ButtonPermission;
