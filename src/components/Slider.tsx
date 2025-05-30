import './Slider.css'

interface Props {
    increaseThreshold: (e: any) => void;
    value: number;
    id: number;
    background: string;
}

const SliderComponent = ({increaseThreshold, value, id, background}: Props) => {


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
        style={{ background: background}}
        className='custom-slider'
      />
    </>
  );
};

export default SliderComponent;
