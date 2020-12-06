import React from 'react';

function Loading({message}) {
  return (
    <div className="loading-div">
        <div class="spinner-border text-info"></div>
        <h4>
            {message}
        </h4>
    </div>
  );
}

export default Loading;