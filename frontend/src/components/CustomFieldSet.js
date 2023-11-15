const CustomFieldSet = ({ customGridDimensions, setCustomGridDimensions }) => {

  const handleChange = e => {
    setCustomGridDimensions({
      ...customGridDimensions,
      [e.target.name]: Number(e.target.value),
    })
  }

  return (
    <div className="container custom-form">
      <div className="row justify-content-center p-3 p-md-4">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="row">
            <label htmlFor="width">width</label>
            <input
              onChange={handleChange}
              type="text"
              name="width"
              id="width"
            />
          </div>
          <div className="row">
            <label htmlFor="height">height</label>
            <input
              onChange={handleChange}
              type="text"
              name="height"
              id="height"
            />
          </div>
          <div className="row">
            <label htmlFor="mineCount">mineCount</label>
            <input
              onChange={handleChange}
              type="text"
              name="mineCount"
              id="mineCount"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomFieldSet