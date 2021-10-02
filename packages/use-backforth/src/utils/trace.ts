const trace = (label: string) => (value: any) => {
  console.log(`now is trace ${label}`);
  console.log(value);
  console.log(`---------------------end-------------------------------`);
  return value;
};

export default trace;
