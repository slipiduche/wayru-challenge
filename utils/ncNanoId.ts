export default function ncNanoId(prefix = "nc_") {
  return (
    prefix + Date.now() + "_" + Math.floor(1 * 999999999999999)
  );
}
