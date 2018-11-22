import * as Expo from "expo";

export async function requestCameraRoll() {
  const { Permissions } = Expo;
  const { status, expires, permissions } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
}
