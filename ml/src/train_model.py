import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib


def train_model(input_csv: str, model_path: str):
    df = pd.read_csv(input_csv)

    # Define features and target
    features = [
        'at_degc_norm', 'rh_%_norm', 'hour', 'dayofweek', 'month',
        'pm2_5_lag_1h', 'pm2_5_rolling_mean_3h'
    ]
    target = 'pm2_5_ug_m3'

    # Drop NA rows
    df = df.dropna(subset=features + [target])

    X = df[features]
    y = df[target]

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = xgb.XGBRegressor(
        objective='reg:squarederror',
        eval_metric='rmse',
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42
    )

    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)

    y_pred = model.predict(X_val)
    rmse = mean_squared_error(y_val, y_pred)
    print(f"Validation RMSE: {rmse:.3f}")

    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")


if __name__ == '__main__':
    import sys
    if len(sys.argv) != 3:
        print('Usage: python train_model.py input_csv model_path')
        sys.exit(1)
    train_model(sys.argv[1], sys.argv[2])
