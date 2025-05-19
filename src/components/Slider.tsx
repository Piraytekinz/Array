import './Slider.css'

interface Props {
    increaseThreshold: (e: any) => void;
    value: number;
    id: number;
}

const SliderComponent = ({increaseThreshold, value, id}: Props) => {
  

  return (
    <>
      <label htmlFor="slider">Threshold {id}: <b>{value}</b></label>
      <input
        type="range"
        id="slider"
        min={0}
        max={255}
        value={value}
        onChange={increaseThreshold}
        style={{ width: "100%"}}
        className='custom-slider'
      />
    </>
  );
};

export default SliderComponent;
