import React, { useState } from 'react';
import { FileText, Upload, Settings, ChevronRight, ChevronLeft, Plus } from 'lucide-react';

// Types
interface FormField {
  name: string;
  defaultValue: string;
  position: string;
  dataType: string;
  required: boolean;
  justification: string;
  description: string;
}

interface RecordDefinition {
  name: string;
  indicator: string;
  indicatorType: string;
  length: string;
  position: string;
  repeat: boolean;
  repeatCount?: string;
  fieldCount: string;
}

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-96 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <main className="relative">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>
        
        <div className="relative z-10 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex justify-center items-center mb-8">
    <div className="flex items-center space-x-4">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform ${
              step < currentStep
                ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg scale-105'
                : step === currentStep
                ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl scale-110 animate-pulse'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-2 rounded-full transition-all duration-300 ${
                step < currentStep ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// Step 1: Format Selection - Single Blue Color Theme
const FormatSelection: React.FC<{
  rowCount: number;
  onRowCountChange: (count: number) => void;
  onNext: (method: string) => void;
}> = ({ rowCount, onRowCountChange, onNext }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const methods = [
    {
      id: 'manual',
      label: 'Manual via GUI',
      icon: Settings,
      description: 'Configure format manually using our interface',
    },
    {
      id: 'upload',
      label: 'Upload CSV File',
      icon: Upload,
      description: 'Upload your CSV file to auto-detect format',
    },
    {
      id: 'other',
      label: 'Other Data Source',
      icon: FileText,
      description: 'Import from other data sources',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 max-w-6xl mx-auto">
      <ProgressIndicator currentStep={1} />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          CSV Converter to ASCII
        </h1>
      </div>
      
      <div className="space-y-12">
        {/* Row Count Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
         
          <div className="flex items-center justify-center space-x-6">
            <label className="text-xl font-semibold text-gray-700">
             How Many Record/rows do you want in ASCII file:
            </label>
            <div className="relative">
              <input
                type="number"
                value={rowCount}
                onChange={(e) => onRowCountChange(parseInt(e.target.value) || 0)}
                className="w-28 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                min="1"
                placeholder="6"
              />
            </div>
          </div>
        </div>
        
        {/* Method Selection */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Choose Your Method
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    onNext(method.id);
                  }}
                  className={`group relative p-8 bg-white border-2 border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform min-h-[200px] ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl'
                      : 'hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-25 hover:to-blue-50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-6 h-full">
                    <div
                      className={`p-4 rounded-2xl transition-all duration-300 ${
                        selectedMethod === method.id
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-center">
                      {method.label}
                    </h3>
                    <p className="text-base text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                      {method.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-500"
                    size={24}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Define Rows - Two Color Theme (Blue + Green)
const DefineRows: React.FC<{
  record: RecordDefinition;
  onChange: (record: RecordDefinition) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ record, onChange, onNext, onBack }) => {
  const updateRecord = (field: keyof RecordDefinition, value: any) => {
    onChange({ ...record, [field]: value });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 max-w-5xl mx-auto">
       <ProgressIndicator currentStep={2} />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hover:from-green-600 hover:to-blue-600 transition-all duration-300">
          CSV Converter to ASCII
        </h1>
      </div>
      
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Define Rows / Records
        </h2>
        
        <div className="w-full max-w-2xl space-y-6">
          {[
            { label: 'Name', key: 'name', placeholder: 'Transmitter' },
            { label: 'Indicator', key: 'indicator', placeholder: 'T' },
            { label: 'Indicator Type', key: 'indicatorType', placeholder: 'Character' },
            { label: 'Length', key: 'length', placeholder: '750' },
            { label: 'Position', key: 'position', placeholder: '1' },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300">
              <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
                {label}
              </label>
              <input
                type="text"
                value={record[key as keyof RecordDefinition] as string}
                onChange={(e) => updateRecord(key as keyof RecordDefinition, e.target.value)}
                className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-green-400 transition-all duration-300 shadow-md hover:shadow-lg"
                placeholder={placeholder}
              />
            </div>
          ))}
          
          <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300">
            <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
              Does it repeat
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100 px-4 py-2 rounded-xl transition-colors duration-300">
                <input
                  type="radio"
                  name="repeat"
                  checked={record.repeat === true}
                  onChange={() => updateRecord('repeat', true)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-lg text-gray-700">Yes</span>
              </label>
              <label className="flex items-center hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100 px-4 py-2 rounded-xl transition-colors duration-300">
                <input
                  type="radio"
                  name="repeat"
                  checked={record.repeat === false}
                  onChange={() => updateRecord('repeat', false)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-lg text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          {record.repeat && (
            <>
              <div className="text-center text-base text-gray-600 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-200">
                If Yes: Select repeat count
              </div>
              <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300">
                <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
                  Repeat Count
                </label>
                <div className="relative">
                  <select
                    value={record.repeatCount || ''}
                    onChange={(e) => updateRecord('repeatCount', e.target.value)}
                    className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-green-400 transition-all duration-300 shadow-md hover:shadow-lg appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="0-m">0-m</option>
                    <option value="1-m">1-m</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
            </>
          )}
          
          {!record.repeat && (
            <div className="text-center text-base text-gray-600 bg-gray-100 p-4 rounded-xl border border-gray-200">
              If No: Repeat count not required
            </div>
          )}
          
          <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300">
            <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
              Number of Fields
            </label>
            <input
              type="number"
              value={record.fieldCount}
              onChange={(e) => updateRecord('fieldCount', e.target.value)}
              className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg text-center focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-green-400 transition-all duration-300 shadow-md hover:shadow-lg"
              placeholder="3"
              min="1"
            />
          </div>
        </div>
        
        <div className="flex justify-between w-full max-w-2xl mt-10">
          <button
            onClick={onBack}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 hover:shadow-lg transition-all duration-300 text-lg font-semibold"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 hover:shadow-lg transition-all duration-300 text-lg font-semibold"
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 3: Define Fields - Three Color Theme (Blue + Green + Purple)
const DefineFields: React.FC<{
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  onBack: () => void;
}> = ({ fields, onFieldsChange, onBack }) => {
  const [currentField, setCurrentField] = useState<FormField>({
    name: '',
    defaultValue: '',
    position: '',
    dataType: 'Char',
    required: true,
    justification: 'Left',
    description: '',
  });

  const addField = () => {
    if (currentField.name.trim()) {
      onFieldsChange([...fields, { ...currentField }]);
      setCurrentField({
        name: '',
        defaultValue: '',
        position: '',
        dataType: 'Char',
        required: true,
        justification: 'Left',
        description: '',
      });
    }
  };

  const updateCurrentField = (key: keyof FormField, value: any) => {
    setCurrentField({ ...currentField, [key]: value });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 max-w-5xl mx-auto">
        <ProgressIndicator currentStep={3} />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-green-600 transition-all duration-300">
          CSV Converter to ASCII
        </h1>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Define Field / Column for Row
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            { label: 'Name', key: 'name', placeholder: 'Record_Type' },
            { label: 'Default Value', key: 'defaultValue', placeholder: 'T' },
            { label: 'Position', key: 'position', placeholder: '1' },
            { label: 'Data Type', key: 'dataType', placeholder: 'Char' },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:via-green-50 hover:to-purple-50 transition-all duration-300">
              <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-green-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
                {label}
              </label>
              <input
                type="text"
                value={currentField[key as keyof FormField] as string}
                onChange={(e) => updateCurrentField(key as keyof FormField, e.target.value)}
                className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg text-center focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg"
                placeholder={placeholder}
              />
            </div>
          ))}
          
          <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:via-green-50 hover:to-purple-50 transition-all duration-300">
            <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-green-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
              Required
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center hover:bg-gradient-to-r hover:from-blue-100 hover:via-green-100 hover:to-purple-100 px-4 py-2 rounded-xl transition-colors duration-300">
                <input
                  type="radio"
                  name="required"
                  checked={currentField.required === true}
                  onChange={() => updateCurrentField('required', true)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-lg text-gray-700">Yes</span>
              </label>
              <label className="flex items-center hover:bg-gradient-to-r hover:from-blue-100 hover:via-green-100 hover:to-purple-100 px-4 py-2 rounded-xl transition-colors duration-300">
                <input
                  type="radio"
                  name="required"
                  checked={currentField.required === false}
                  onChange={() => updateCurrentField('required', false)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-lg text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:via-green-50 hover:to-purple-50 transition-all duration-300">
            <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-green-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
              Justification
            </label>
            <div className="relative">
              <select
                value={currentField.justification}
                onChange={(e) => updateCurrentField('justification', e.target.value)}
                className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg text-center focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg appearance-none"
              >
                <option value="Left">Left</option>
                <option value="Right">Right</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center group p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:via-green-50 hover:to-purple-50 transition-all duration-300">
            <label className="text-lg font-semibold text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-green-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 min-w-[140px]">
              Description
            </label>
            <input
              type="text"
              value={currentField.description}
              onChange={(e) => updateCurrentField('description', e.target.value)}
              className="w-60 h-12 px-4 py-2 border-2 border-gray-300 rounded-xl text-lg text-center focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg"
              placeholder="Enter description"
            />
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={addField}
              disabled={!currentField.name.trim()}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-green-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} className="inline mr-2" />
              Add
            </button>
          </div>
        </div>

        {/* Fields Table Preview */}
        {fields.length > 0 && (
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg max-w-4xl mx-auto overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-100 via-green-100 to-purple-100">
                <tr>
                  <th className="border border-gray-300 px-6 py-4 text-lg font-bold text-gray-800">
                    Transmitter T
                  </th>
                  {fields.map((field, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-6 py-4 text-lg font-bold text-gray-800"
                    >
                      {field.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-green-50 hover:to-purple-50 transition-colors duration-300">
                  <td className="border border-gray-300 px-6 py-4 text-lg text-center font-medium">T</td>
                  {fields.map((field, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-6 py-4 text-lg text-center font-medium"
                    >
                      {field.defaultValue || '2024'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        <div className="flex justify-start mt-10">
          <button
            onClick={onBack}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 hover:shadow-lg transition-all duration-300 text-lg font-semibold"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const CSVConverterApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rowCount, setRowCount] = useState(6);
  const [record, setRecord] = useState<RecordDefinition>({
    name: 'Transmitter',
    indicator: 'T',
    indicatorType: 'Character',
    length: '750',
    position: '1',
    repeat: false,
    fieldCount: '3',
  });
  const [fields, setFields] = useState<FormField[]>([]);

  const handleNext = (method?: string) => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout>
      {currentStep === 1 && (
        <FormatSelection
          rowCount={rowCount}
          onRowCountChange={setRowCount}
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <DefineRows
          record={record}
          onChange={setRecord}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <DefineFields
          fields={fields}
          onFieldsChange={setFields}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

export default CSVConverterApp;