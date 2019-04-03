import { Permissions } from 'expo';

export default async function getPermission(permission) {
  const { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    return false;
  }
  return true;
}
