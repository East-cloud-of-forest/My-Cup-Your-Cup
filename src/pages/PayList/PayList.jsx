import React from 'react';
import PayListComp from '../../components/PayListComp/PayListComp';

const PayList = () => {
  return (
    <div>
      <div>
        <h2>
          결제내역
        </h2>
      </div>
      <div>
        <PayListComp/>
      </div>
    </div>
  );
};

export default PayList;